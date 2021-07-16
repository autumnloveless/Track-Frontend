<script>
  import { logout, checkAuth } from '../services/authService.js'
  import { onMount } from 'svelte';
  import { user } from '../store.js'

  let menuVisible = false;
  onMount( async () => {
    checkAuth();
  })

  const toggleMenu = () => {
    menuVisible = !menuVisible;
  }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/#/">
      <img src="/lumin-color.svg" width="112" height="28" alt="logo" />
    </a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" class:is-active="{menuVisible}" on:click={toggleMenu}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navMenu" class:is-active="{menuVisible}" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/#/app">App</a>
    </div>

    <div class="navbar-end">
      <a class="navbar-item" href="/#/settings">Settings</a>
      <div class="navbar-item">
        <div class="buttons">
          {#if $user.id == undefined}
            <!-- <a class="button is-primary" href="/#/signup"><strong>Sign up</strong></a> -->
            <a class="button is-light" href="/#/login">Log in</a>
          {:else}
            <button class="button is-light" on:click={logout}>Logout</button>
          {/if}
        </div>
      </div>
    </div>
  </div>

</nav>

<style>
  .navbar {
    background-color: transparent;
  }
</style>
