<script>
  export let filter;
</script>

<aside class="column ml-2-tablet is-2 is-narrow-mobile section is-hidden-mobile">
  <p class="menu-label is-hidden-mobile">Inbox</p>
  <ul class="menu-list">
    <li><button type="button" class="button-link" on:click={() => filter = "all"}>All</button></li>
    <li><button type="button" class="button-link" on:click={() => filter = "unread"}>Unread</button></li>
    <li><button type="button" class="button-link" on:click={() => filter = "starred"}>Starred</button></li>
  </ul>

  <p class="menu-label is-hidden-mobile" style="margin-top: 3em">
    Accounts
  </p>
  <ul class="menu-list">
    <li>
      <input type="checkbox" name="" id="">
      <button type="button" class="button-link" on:click={() => filter = "starred"}>Savings</button>
    </li>
    <li>
      <input type="checkbox" name="" id="">
      <button type="button" class="button-link" on:click={() => filter = "starred"}>Checking</button>
    </li>
    <li>
      <input type="checkbox" name="" id="">
      <button type="button" class="button-link" on:click={() => filter = "starred"}>Checking</button>
    </li>
  </ul>
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
