<script>
  import { onDestroy, onMount } from 'svelte';
  import Aside from "../components/Sidebar.svelte"
  import Transactions from "../components/Transactions.svelte"
  import PlaidSetup from "../components/PlaidSetup.svelte"
  import api from '../services/apiService.js';
  import {checkAuth} from '../services/authService.js';
  import { push } from 'svelte-spa-router';

  let accountPromise, loading=true

  onMount(async () => {
    let { user } = await checkAuth();
    if(!user.id){
      push('/login')
    }else {
      loading = false;
      accountPromise = api.getAccounts();
    }
  })

  let filter = "all"

</script>

{#if loading}
  <div class="loading-container section is-medium">
    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
{:else}
  <section class="main-content-container">
    <Aside bind:filter={filter}/>
    <div class="main-content scroll">
      {#await accountPromise}
      <div class="loading-container section is-medium">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
      {:then accounts}
        {#if accounts && accounts.length > 0}
          <Transactions filter={filter}/>
        {:else}
          <PlaidSetup/>
        {/if}
      {:catch error}
        <p style="color: red">{error.message}</p>
      {/await}
    </div> 
  </section>
{/if}


<style>
  
  .main-content-container {
    display: flex;
    padding: 10px;
    height: calc(100vh - 56px);
  }

  .main-content {
    padding: 3px;
    flex: 1;
  }


</style>