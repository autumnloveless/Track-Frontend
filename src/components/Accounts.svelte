<script>
  import Fa from 'svelte-fa'
  import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
  export let accounts;
  import collapse from 'svelte-collapse'
  let open = false;
</script>

<div class="card">
  <div class="card-header capitalize" on:click={() => open = !open}>
    <p class="card-header-title">Accounts</p>
    {#if open}
    <p class="card-header-icon"><Fa icon={faAngleUp}/></p>
    {:else}
    <p class="card-header-icon"><Fa icon={faAngleDown}/></p>
    {/if}
  </div>
  <div class="card-content" style="padding: 0; padding-top: 5px;" use:collapse={{open, duration: 0.6}}>
    <div class="table-container">
        <table id="" class="table is-hoverable is-active">
          <tbody>
            {#each accounts as account, i}
              <tr>
                  <td class="">{ account.name }</td>
                  <td class="">{ account.mask }</td>
                  <td class="">{account.type} > { account.subtype }</td>
                  <td class="has-text-right is-narrow">${account.balanceCurrent.toFixed(2)}</td>
                  <td class="is-narrow"><button class="button is-info is-light">Edit Name</button></td>
                  <td class="is-narrow"><button class="button is-danger is-light">Unlink</button></td>
              </tr>
            {/each}
          </tbody>
        </table>
    </div>
  </div>
</div>


<style lang="scss">
      
</style>