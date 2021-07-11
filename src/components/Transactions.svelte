<script>
  import api from '../services/apiService.js';
  import Fa from 'svelte-fa'
  import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
  import TransactionRow from './TransactionRow.svelte';
  import Multiselect from './Multiselect.svelte';
  import CollapseIcon from './CollapseIcon.svelte';
  import Unread from '../components/Unread.svelte';
  import { onMount } from 'svelte';
  import { selectedTransactions } from '../store.js';
  import collapse from 'svelte-collapse'
  let unreadOpen = true, readOpen = true;
  let loading = true, refresh = false;
  let selected = [], selectedUnread = false;
  selectedTransactions.subscribe((s) => { 
    selected = s;
    selectedUnread = s.reduce((total, current) => { total && !current.read }, false);
  });

  // export let filter;
  
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
    result = await api.updateMultipleTransactions({
      ids: selected.map(id => id),
      update: { read: isRead }
    })
  }

  const handleMultiselectButton = async (event) => {
    switch(event.detail.option) {
      case "all":
        selectedTransactions.set(transactions.map(t => t.id))
        break;
      case "none":
        selectedTransactions.set([])
        break;
      case "unread":
        selectedTransactions.set(transactions.filter(t => !t.read).map(t => t.id))
        break;
      case "read":
        selectedTransactions.set(transactions.filter(t => t.read).map(t => t.id))
        break;
      default:
        if(selected.length > 0){
          selectedTransactions.set([])
        } else {
          selectedTransactions.set(transactions.map(t => t.id))
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
      <div class="pl-3" style="transform: scale(1.3)"><Unread read={selectedUnread} /></div>
    {/if}
  </div>
  <div class="card">
    <div class="card-header capitalize thin-border-bottom" on:click={() => unreadOpen = !unreadOpen}>
      <p class="card-header-title">Unread ({unreadTransactions.length})</p>
      <CollapseIcon open={unreadOpen} />
    </div>
    <div class="card-content p-0" use:collapse={{open: unreadOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            {#each unreadTransactions as transaction, i}
              <TransactionRow transaction={transaction} bind:group={$selectedTransactions} />
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="card mt-5">
    <div class="card-header capitalize thin-border-bottom" on:click={() => readOpen = !readOpen}>
      <p class="card-header-title">Read ({readTransactions.length})</p>
      <CollapseIcon open={readOpen} />
    </div>
    <div class="card-content p-0" use:collapse={{open: readOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            {#each readTransactions as transaction, i}
              <TransactionRow transaction={transaction} bind:group={selected}/>
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