<script>
  import Fa from 'svelte-fa'
  import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
  import api from '../services/apiService.js';
  import Starred from './Starred.svelte';
  import { onMount } from 'svelte';
  import collapse from 'svelte-collapse'
  let unreadOpen = true, readOpen = true;
  export let filter;
  
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
    <div class="card-header capitalize" on:click={() => unreadOpen = !unreadOpen}>
      <p class="card-header-title">Unread</p>
      {#if unreadOpen}
      <p class="card-header-icon"><Fa icon={faAngleUp}/></p>
      {:else}
      <p class="card-header-icon"><Fa icon={faAngleDown}/></p>
      {/if}
    </div>
    <div class="card-content" class:pt-2="{unreadOpen}" style="padding: 0" use:collapse={{open: unreadOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            {#each unreadTransactions as transaction, i}
              <tr class:is_read="{transaction.read}">
                  <td class="is-narrow"><input type="checkbox" name="" id=""></td>
                  <td class="is-narrow"><Starred starred={transaction.starred}/></td>
                  <td class="has-text-right ">${transaction.amount.toFixed(2)}</td>
                  <td>{ transaction.merchantName || transaction.name}</td>
                  <td>{new Date(transaction.date).toLocaleString([],{hour: '2-digit', minute:'2-digit'})}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div class="card mt-5">
    <div class="card-header capitalize" on:click={() => readOpen = !readOpen}>
      <p class="card-header-title">Read</p>
      {#if readOpen}
      <p class="card-header-icon"><Fa icon={faAngleUp}/></p>
      {:else}
      <p class="card-header-icon"><Fa icon={faAngleDown}/></p>
      {/if}
    </div>
    <div class="card-content" class:pt-2="{readOpen}" style="padding: 0;" use:collapse={{open: readOpen, duration: 0.6}}>
      <div class="table-container">
        <table class="table is-hoverable is-fullwidth">
          <tbody>
            {#each readTransactions as transaction, i}
              <tr class:is_read="{transaction.read}">
                  <td class="is-narrow"><input type="checkbox" name="" id=""></td>
                  <td class="is-narrow"><Starred starred={transaction.starred}/></td>
                  <td class="has-text-right ">${transaction.amount.toFixed(2)}</td>
                  <td>{ transaction.merchantName || transaction.name}</td>
                  <td>{new Date(transaction.date).toLocaleString([],{hour: '2-digit', minute:'2-digit'})}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}


<style lang="scss">
    .is_read {
      background-color: #f2f2f2;
      td {
        border: 1px solid #cbcbcb;
        border-width: 0 0 1px;
      }
    }
    
  </style>