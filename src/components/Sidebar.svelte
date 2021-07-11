<script>
  export let filter,accounts;
  import collapse from 'svelte-collapse'
  import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  let open = true;
</script>

<aside class="sidebar mt-5 ml-2 is-hidden-mobile scroll" >
  <div class="">
    <p class="menu-label is-hidden-mobile">Inbox</p>
    <ul class="menu-list">
      <li><button type="button" class="button-link" on:click={() => filter = "all"}>All</button></li>
      <li><button type="button" class="button-link" on:click={() => filter = "starred"}>Starred</button></li>
    </ul>

    <p class="pointer menu-label is-hidden-mobile" style="margin-top: 3em" on:click={() => open = !open}>
      <span>Accounts</span>
      {#if open}
        <span class=""><Fa icon={faAngleUp}/></span>
      {:else}
        <span class=""><Fa icon={faAngleDown}/></span>
      {/if}
    </p>
    <ul class="menu-list" use:collapse={{open, duration: 0.6}}>
      {#each accounts as account, i}
        <li>
          <input type="checkbox" name="" id="">
          <button type="button" class="button-link">{account.name}</button>
        </li>
      {/each}
    </ul>
  </div>
</aside>

<style type="text/scss">
  .button-link {
    font-weight: 400;
    color: #363636;
    background-color: transparent;
    border-color: transparent;

    &:hover {
      color: #262626;
      text-decoration: underline;
      background-color: transparent;
      border-color: transparent;
    }

    &:focus {
      text-decoration: underline;
      border-color: transparent;
      box-shadow: none;
    }

  }

</style>
