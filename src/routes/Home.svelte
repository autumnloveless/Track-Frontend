<script>
  import {fade} from 'svelte/transition'
  import { onMount } from 'svelte';
  import Aside from "../components/Sidebar.svelte"
  import Transactions from "../components/Transactions.svelte"
  import PlaidSetup from "../components/PlaidSetup.svelte"
  import api from '../services/apiService.js';
  import {checkAuth} from '../services/authService.js';
  import { push,replace } from 'svelte-spa-router';

  let accountPromise, loading=true

  onMount(async () => {
    let { user } = await checkAuth();
    if(!user || !user.id){
      replace('/login')
    }else {
      loading = false;
      accountPromise = api.getAccounts();
    }
  })

  let selectedAccounts = [];

</script>

<div in:fade="{{duration: 500}}"> 
  {#if loading}
    <div class="loading-container section is-medium">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  {:else}
    {#await accountPromise}
      <div class="loading-container section is-medium">
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </div>
    {:then accounts}
      <section class="main-content-container">
        <Aside accounts={accounts} bind:selectedAccounts={selectedAccounts}/>
        <div class="main-content scroll">
          {#if accounts && accounts.length > 0}
            <Transactions selectedAccounts={selectedAccounts} accounts={accounts} />
          {:else}
            <PlaidSetup/>
          {/if}
        </div> 
      </section>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
</div>

<style>
  


</style>