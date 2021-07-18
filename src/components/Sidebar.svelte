<script>
  export let filter,accounts,selectedAccounts = [];
  import collapse from 'svelte-collapse'
  import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  let open = true;
  const selectAccount = () => {
    selectedAccounts = selectedAccounts.length > 0 ? [] : accounts.map(a => a.accountId);
  }
</script>

<aside class="sidebar mt-5 ml-2 is-hidden-mobile scroll" >
  <div class="">
    <p class="menu-label is-hidden-mobile">Inbox</p>
    <ul class="menu-list">
      <li><button type="button" class="button-link" on:click={() => filter = "all"}>All</button></li>
      <li><button type="button" class="button-link" on:click={() => filter = "starred"}>Starred</button></li>
    </ul>

    <p class="pointer menu-label is-hidden-mobile is-flex is-align-items-center" style="margin-top: 3em" on:click={() => open = !open}>
      <input type="checkbox" on:click|stopPropagation={selectAccount} checked={selectedAccounts.length > 0}>
      <span class="mx-3">Accounts ({ selectedAccounts.length > 0 ? selectedAccounts.length : accounts.length })</span>
      {#if open}
        <span class=""><Fa icon={faAngleUp}/></span>
      {:else}
        <span class=""><Fa icon={faAngleDown}/></span>
      {/if}
    </p>
    <ul class="" use:collapse={{open, duration: 0.6}}>
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
</aside>

<style type="text/scss">
  .sidebar {
    width: 200px;
  }

  .sidebar-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
