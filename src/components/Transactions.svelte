<script>
  import api from '../services/apiService.js';
  import { get } from 'svelte/store';
  import Fa from 'svelte-fa'
  import { faRedoAlt, faFilter } from '@fortawesome/free-solid-svg-icons'
  import TransactionRow from './TransactionRow.svelte';
  import Multiselect from './Multiselect.svelte';
  import CollapseIcon from './CollapseIcon.svelte';
  import Unread from '../components/Unread.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { selectedTransactions } from '../store.js';
  import {querystring} from 'svelte-spa-router'
  import collapse from 'svelte-collapse'
  let searchParams, limit, page;
  let unreadOpen = true, readOpen = true, filterOpen = false;
  let loading = true, refresh = false;
  let selected = [], selectedUnread = false;
  let unsubscribe = selectedTransactions.subscribe((s) => { 
    selected = s;
  });
  onDestroy(() => unsubscribe())

  $: { 
    selectedTransactions.set(selected)
    selectedUnread = selected.reduce((total, current) => ( total && !current.read ), true);
  }

  export let filter, selectedAccounts, accounts =[];
  if(filter) { 
    //filter by tag?
  }
  
  let transactions=[],unreadTransactions=[],readTransactions=[];
  onMount(async () => {
    searchParams = new URLSearchParams(get(querystring));
    limit = searchParams.get("limit") || 10;
    page = searchParams.get("page") || 1;
    await getTransactions(limit,page);
  })

  const getTransactions = async (_limit, _page, isRefresh = false) => {
    if (isRefresh) { rotateButton() }
    else { loading = true; }
    transactions = await api.getTransactions(_limit,((_page-1) * _limit));
    unreadTransactions = [];
    readTransactions = [];
    transactions.forEach(transaction => {
      if(!transaction.read){
        unreadTransactions.push(transaction);
      } else{
        readTransactions.push(transaction);
      }
    });
    loading = false;
  }

  const rotateButton = () => {
      refresh = false;
      setTimeout(function() { refresh = true; }, 10);
  }

  const updateManyRead = async (isRead) => {
    let result = await api.bulkUpdateTransactions({
      ids: selected.map(s => s.id),
      update: { read: isRead }
    })
    await getTransactions(limit,page,true);
  }

  const handleMultiselectButton = async (event) => {
    switch(event.detail.option) {
      case "all":
        selected = transactions.map(t => ({ id: t.id, read: t.read }))
        break;
      case "none":
        selected = []
        break;
      case "unread":
        selected = transactions.filter(t => !t.read).map(t =>  ({ id: t.id, read: t.read }))
        break;
      case "read":
        selected = transactions.filter(t => t.read).map(t => ({ id: t.id, read: t.read }))
        break;
      default:
        if(selected.length > 0){
          selected = []
        } else {
          selected = transactions.map(t => ({ id: t.id, read: t.read }))
        }
    }
  }

</script>

{#if loading}
  <div class="section is-medium is-flex is-justify-content-center is-align-items-center">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
{:else}
  <div class="mb-2 is-flex is-align-items-center" >
    <Multiselect selectedLength={selected.length} transactionsLength={transactions.length} on:multiselectButton={handleMultiselectButton} />
    <span on:click={() => getTransactions(limit,page,true)} class="inline-block mx-3 pointer" class:rotate-720="{refresh}"><Fa icon={faRedoAlt} /></span>
    {#if selected.length > 0}
      <div class="pl-5 pointer" style="transform: scale(1.3)" on:click={() => updateManyRead(selectedUnread)}><Unread read={selectedUnread} /></div>
    {/if}
    <span class="inline-block mx-3 pointer is-hidden-tablet" on:click={() => filterOpen = !filterOpen}><Fa icon={faFilter} /></span>
  </div>
  <div class="is-hidden-tablet filter-mobile" use:collapse={{open: filterOpen, duration: 0.6}}>
    <ul class="">
      {#each accounts as account, i}
        <li class="p-1">
          <input id="{account.accountId}" type="checkbox" bind:group={selectedAccounts} value={account.accountId}>
          <label class="inline-block" for="{account.accountId}">{account.name}</label>
        </li>
      {/each}
    </ul>
  </div>
  <div class="card light-grey">
    <div class="card-header capitalize thin-border-bottom" on:click={() => unreadOpen = !unreadOpen}>
      <p class="card-header-title">Unread (
        {#if selectedAccounts.length == 0}
          {unreadTransactions.length}
        {:else}
          {unreadTransactions.filter((t) => selectedAccounts.indexOf(t.accountId) != -1).length}
        {/if}  
      )</p>
      <CollapseIcon open={unreadOpen} />
    </div>
    <div class="card-content p-0" use:collapse={{open: unreadOpen, duration: 0.6}}>
      <table class="table is-hoverable">
        <tbody>
          {#each unreadTransactions as transaction (transaction.id)}
            {#if selectedAccounts.length == 0 || selectedAccounts.indexOf(transaction.accountId) != -1}
              <TransactionRow transaction={transaction} bind:group={selected} />
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="card mt-5 light-grey">
    <div class="card-header capitalize thin-border-bottom" on:click={() => readOpen = !readOpen}>
      <p class="card-header-title">Read (
        {#if selectedAccounts.length == 0}
          {readTransactions.length}
        {:else}
          {readTransactions.filter((t) => selectedAccounts.indexOf(t.accountId) != -1).length}
        {/if}
        )</p>
      <CollapseIcon open={readOpen} />
    </div>
    <div class="card-content p-0" use:collapse={{open: readOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable">
          <tbody>
            {#each readTransactions as transaction (transaction.id)}
              {#if selectedAccounts.length == 0 || selectedAccounts.indexOf(transaction.accountId) != -1}
                <TransactionRow transaction={transaction} bind:group={selected}/>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}

<style>
  .inline-block {
    display: inline-block; 
    width: fit-content;
  }

  .rotate-720 {
    animation: rotate-720 cubic-bezier(0.23,-0.41, 0.69, 1.41) 3s;
  }

  .light-grey {
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  }

  .filter-mobile {
    background: rgba(0, 0, 0, 0.03);
    padding: 0px 8px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  @keyframes rotate-720 {
    from { transform: rotate(0) }
    to { transform: rotate(720deg) }
  }
</style>