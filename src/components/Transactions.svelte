<script>
  import api from '../services/apiService.js';
  import { get } from 'svelte/store';
  import Fa from 'svelte-fa'
  import { faRedoAlt, faFilter, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
  import TransactionRow from './TransactionRow.svelte';
  import Multiselect from './Multiselect.svelte';
  import CollapseIcon from './CollapseIcon.svelte';
  import Unread from '../components/Unread.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { selectedTransactions, filterString } from '../store.js';
  import {querystring} from 'svelte-spa-router'
  import collapse from 'svelte-collapse'
  export let selectedAccounts, accounts =[];
  let readPageSize = 10, unreadPageSize = 10, readPageNum = 1, unreadPageNum = 1;
  let unreadOpen = true, readOpen = true, filterOpen = false;
  let loading = true, refresh = false;
  let transactions=[],unreadTransactions=[],readTransactions=[];
  let filteredUnreadTransactions = [], paginatedUnreadTransactions = [];
  let filteredReadTransactions = [], paginatedReadTransactions = [];
  let selected = [], selectedUnread = false;
  let searchTerm = "";
  let unsubscribeSelectedTransactions = selectedTransactions.subscribe((s) => { 
    selected = s;
  });
  let unsubscribeFilterString = filterString.subscribe((s) => { 
    searchTerm = s;
  });
  onDestroy(() => { 
    unsubscribeSelectedTransactions();
    unsubscribeFilterString();
  })

  $: { 
    selectedTransactions.set(selected)
    selectedUnread = selected.reduce((total, current) => ( total && !current.read ), true);
  }
  $: filteredReadTransactions = filter(readTransactions,selectedAccounts, searchTerm);
  $: paginatedReadTransactions = paginate(filteredReadTransactions,readPageSize,readPageNum);
  $: filteredUnreadTransactions = filter(unreadTransactions,selectedAccounts, searchTerm);
  $: paginatedUnreadTransactions = paginate(filteredUnreadTransactions,unreadPageSize,unreadPageNum);
  
  onMount(async () => {
    await getTransactions();
  });

  const paginate = (array, page_size, page_number) => {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const filter = (array,selectedAccounts, searchString) => {
    if(selectedAccounts.length == 0 && searchString.length == 0) { return array; }
    else { 
      let filteredArr = array.filter(t => { 
        let containsAllSearchTerms = true;
        if(searchString.length > 0){
          let searchArr = searchString.trim().toLowerCase().split(',');
          let searchDomain = [
            t.amount.toFixed(2),
            t.category,
            t.transactionType,
            t.name,
            t.merchantName,
            t.PlaidAccount?.name,
            t.date,
            t.tags
          ].join(" ").toLowerCase();
          if(t.pending) { searchDomain += " pending" }
          if(t.starred) { searchDomain += " starred" }
          containsAllSearchTerms = searchArr.reduce((total, term) => total && (searchDomain.indexOf(term.trim()) > -1), true)
        }
        return (selectedAccounts.indexOf(t.accountId) != -1 || selectedAccounts.length == 0) && containsAllSearchTerms
      })
      return filteredArr;
    }
  }

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

  const updateTransaction = (event) => {
    unreadTransactions.filter(t => t.id == event.detail.id).forEach(t => t.starred = event.detail.starred);
    readTransactions.filter(t => t.id == event.detail.id).forEach(t => t.starred = event.detail.starred);
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
    <span on:click={() => getTransactions(true)} class="inline-block mx-3 pointer" class:rotate-720="{refresh}"><Fa icon={faRedoAlt} /></span>
    {#if selected.length > 0}
      <div class="pl-5 pointer" style="transform: scale(1.3)" on:click={() => updateManyRead(selectedUnread)}><Unread read={selectedUnread} /></div>
    {/if}
    <span class="inline-block mx-3 pointer is-hidden-tablet" on:click={() => filterOpen = !filterOpen}><Fa icon={faFilter} /></span>
    <input id="searchbar" class="input is-hidden-mobile mx-3" type="text" placeholder="search here, separate terms with commas, eg: starred, fast food" bind:value={searchTerm}>
  </div>
  <input id="searchbar" class="input is-hidden-tablet my-3" type="text" placeholder="search here, separate terms with commas, eg: starred, fast food" bind:value={searchTerm}>
  <div class="is-hidden-tablet filter-mobile" use:collapse={{open: filterOpen, duration: 0.6}}>
    <ul class="">
      {#each accounts as account, i}
        <li class="is-flex is-align-items-flex-start">
          <input id="{account.accountId}" type="checkbox" class="mr-1 my-2" bind:group={selectedAccounts} value={account.accountId}>
          <label for="{account.accountId}" title="{account.name}" class="mx-1 my-1 pt-0 pr-1 has-text-left pointer sidebar-text">
            <span class="">{account.name}</span>
            <br>
            <b>${account.balanceCurrent}</b>
          </label>
        </li>
      {/each}
    </ul>
  </div>
  <div class="card light-grey">
    <div class="card-header thin-border-bottom" on:click={() => unreadOpen = !unreadOpen}>
      <CollapseIcon open={unreadOpen} />     
      <p class="card-header-title">Unread ({ filteredUnreadTransactions.length })</p>
      <!-- {#if filteredUnreadTransactions.length > unreadPageSize } -->
        <div class="p-3">
          <nav class="pagination is-small" role="navigation" aria-label="pagination">
            <div class="px-2">{((unreadPageNum - 1) * unreadPageSize)+1}-{(unreadPageNum*unreadPageSize)} of {filteredUnreadTransactions.length}</div>
            <button on:click|stopPropagation={() => unreadPageNum -= 1} class="pagination-previous"><Fa icon={faArrowLeft} /></button>
            <button on:click|stopPropagation={() => unreadPageNum += 1} class="pagination-next"><Fa icon={faArrowRight} /></button>
          </nav>
        </div>
      <!-- {/if} -->
    </div>
    <div class="card-content p-0" use:collapse={{open: unreadOpen, duration: 0.6}}>
      <table class="table is-hoverable">
        <tbody>
          {#each paginatedUnreadTransactions as transaction (transaction.id)}
            <TransactionRow transaction={transaction} bind:group={selected} on:update={updateTransaction} />
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="card mt-5 light-grey">
    <div class="card-header thin-border-bottom" on:click={() => readOpen = !readOpen}>
      <CollapseIcon open={readOpen} />
      <p class="card-header-title">Read</p>
        <!-- {#if readTransactions.length > readPageSize} -->
          <div class="p-3">
            <nav class="pagination is-small" role="navigation" aria-label="pagination">
              <div class="px-2">{((readPageNum - 1) * readPageSize)+1}-{(readPageNum*readPageSize)} of {filteredReadTransactions.length}</div>
              <button on:click|stopPropagation={() => readPageNum -= 1} class="pagination-previous"><Fa icon={faArrowLeft} /></button>
              <button on:click|stopPropagation={() => readPageNum += 1} class="pagination-next"><Fa icon={faArrowRight} /></button>
            </nav>
          </div>
        <!-- {/if} -->
    </div>
    <div class="card-content p-0" use:collapse={{open: readOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable">
          <tbody>
            {#each paginatedReadTransactions as transaction (transaction.id)}
              <TransactionRow transaction={transaction} bind:group={selected} on:update={updateTransaction}/>
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