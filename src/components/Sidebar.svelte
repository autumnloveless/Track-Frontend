<script>
  export let filter;
</script>

<aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
  <p class="menu-label is-hidden-touch">Inbox</p>
  <ul class="menu-list">
    <li><button type="button" class="button-link" on:click={() => filter = "all"}>All</button></li>
    <li><button type="button" class="button-link" on:click={() => filter = "unread"}>Unread</button></li>
    <li><button type="button" class="button-link" on:click={() => filter = "starred"}>Starred</button></li>
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

    // Remove all padding and height so it's just plain, unpadded text.
    &.button-text {
      padding: 0;
      height: unset;
    }
  }
</style>
