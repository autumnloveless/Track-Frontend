<script>
  import api from '../services/apiService.js';
  import Fa from 'svelte-fa'
  import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
  import TransactionRow from './TransactionRow.svelte';
  import Multiselect from './Multiselect.svelte';
  import CollapseIcon from './CollapseIcon.svelte';
  import Unread from '../components/Unread.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { selectedTransactions } from '../store.js';
  import collapse from 'svelte-collapse'
  let unreadOpen = true, readOpen = true;
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

  export let filter, selectedAccounts;
  if(filter) { 
    //filter by tag?
  }
  
  let transactions=[],unreadTransactions=[],readTransactions=[];
  onMount(async () => await getTransactions())

  const getTransactions = async (isRefresh = false) => {
    if (isRefresh) { rotateButton() }
    else { loading = true; }
    transactions = await api.getTransactions();
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
    await getTransactions(true);
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
    <span on:click={() => getTransactions(true)} class="inline-block ml-3 pointer" class:rotate-720="{refresh}"><Fa icon={faRedoAlt} /></span>
    {#if selected.length > 0}
      <div class="pl-5 pointer" style="transform: scale(1.3)" on:click={() => updateManyRead(selectedUnread)}><Unread read={selectedUnread} /></div>
    {/if}
  </div>
  <div class="card">
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
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
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
  </div>

  <div class="card mt-5">
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
        <table class="table is-hoverable is-fullwidth">
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

  @keyframes rotate-720 {
    from { transform: rotate(0) }
    to { transform: rotate(720deg) }
  }
</style>