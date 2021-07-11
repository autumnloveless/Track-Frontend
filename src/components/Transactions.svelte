<script>
  import api from '../services/apiService.js';
  import Fa from 'svelte-fa'
  import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
  import TransactionRow from './TransactionRow.svelte';
  import Multiselect from './Multiselect.svelte';
  import CollapseIcon from './CollapseIcon.svelte';
  import { onMount } from 'svelte';
  import { selectedTransactions } from '../store.js';
  import collapse from 'svelte-collapse'
  let unreadOpen = true, readOpen = true;
  let loading = true, refresh = false;
  let selected = [];
  selectedTransactions.subscribe((s) => { selected = s })

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

</script>

{#if loading}
  <div class="section is-medium is-flex is-justify-content-center is-align-items-center">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
{:else}
  <div class="mb-2 is-flex is-align-items-center" >
    <Multiselect selected={selected}/>
    <span on:click={() => getTransactions(true)} class="inline-block pl-3" class:rotate-720="{refresh}"><Fa icon={faRedoAlt} /></span>
  </div>
  <div class="card">
    <div class="card-header capitalize thin-border-bottom" on:click={() => unreadOpen = !unreadOpen}>
      <p class="card-header-title">Unread</p>
      <CollapseIcon open={unreadOpen} />
    </div>
    <div class="card-content p-0" use:collapse={{open: unreadOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            {#each unreadTransactions as transaction, i}
              <TransactionRow transaction={transaction} bind:group={selected} />
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="card mt-5">
    <div class="card-header capitalize thin-border-bottom" on:click={() => readOpen = !readOpen}>
      <p class="card-header-title">Read</p>
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