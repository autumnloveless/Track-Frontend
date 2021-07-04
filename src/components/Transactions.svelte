<script>
  import Fa from 'svelte-fa'
  import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'
  import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons'
  export let filter, transactions;
</script>

<div class="card">
    <div class="card-header capitalize"><p class="card-header-title">{filter}</p></div>
    <div class="card-content" style="padding: 0; padding-top: 5px;">
    <div class="table-container is-scrollable">
        <table class="table is-hoverable is-fullwidth">
        <tbody>
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
                <td>{transaction.store}</td>
                <td>{transaction.date}</td>
            </tr>
            {/each}
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