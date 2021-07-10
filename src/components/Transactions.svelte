<script>
  import api from '../services/apiService.js';
  import TransactionRow from './TransactionRow.svelte';
  import CollapseIcon from './CollapseIcon.svelte';
  import { onMount } from 'svelte';
  import collapse from 'svelte-collapse'
  let unreadOpen = true, readOpen = true;
  // export let filter;
  
  let loading = true;
  let transactions=[],unreadTransactions=[],readTransactions=[];
  onMount(async () => {
    transactions = await api.getTransactions();
    transactions.forEach(transaction => {
      if(!transaction.read){
        unreadTransactions.push(transaction);
      } else{
        readTransactions.push(transaction);
      }
    });
    loading = false;
  })
</script>

{#if loading}
  <div class="section is-medium is-flex is-justify-content-center is-align-items-center">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
{:else}
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
              <TransactionRow transaction={transaction}/>
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
              <TransactionRow transaction={transaction}/>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}