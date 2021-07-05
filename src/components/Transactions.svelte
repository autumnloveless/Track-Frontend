<script>
  import Fa from 'svelte-fa'
  import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
  import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
  import api from '../services/apiService.js';

  export let filter;
  let transactionPromise = api.getTransactions();
</script>

<div class="card">
    <div class="card-header capitalize"><p class="card-header-title">{filter}</p></div>
    <div class="card-content" style="padding: 0; padding-top: 5px;">
    <div class="table-container is-scrollable">
        <table class="table is-hoverable is-fullwidth">
        <tbody>
          {#await transactionPromise}
            <div class="section is-medium is-flex is-justify-content-center is-align-items-center">
              <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
          {:then transactions}
            {#each transactions as transaction, i}
            <tr class:is_read="{transaction.read}">
                <td class="is-narrow"><input type="checkbox" name="" id=""></td>
                <td class="is-narrow">
                {#if transaction.starred}
                    <Fa icon={solidStar}/>
                {:else}
                    <Fa icon={regularStar}/>
                {/if}
                </td>
                <td class="has-text-right ">${transaction.amount.toFixed(2)}</td>
                <td>{ transaction.merchantName || transaction.name}</td>
                <td>{new Date(transaction.date).toLocaleString([],{hour: '2-digit', minute:'2-digit'})}</td>
            </tr>
            {/each}
          {:catch error}
            <p>There was an error loading your transactions: </p>
            <p style="color: red">{error.message}</p>
          {/await}
        </tbody>
        </table>
    </div>
    </div>
</div>


<style lang="scss">
    .is_read {
      background-color: #f2f2f2;
      td {
        border: 1px solid #cbcbcb;
        border-width: 0 0 1px;
      }
    }
    .is-scrollable {
      overflow-y: auto;
    }
    .table-container {
      max-height: calc(85vh - 105px);
    }
    
  </style>