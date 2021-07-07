<script>
  import { onDestroy } from 'svelte';
  import Aside from "../components/Sidebar.svelte"
  import Transactions from "../components/Transactions.svelte"
  import PlaidSetup from "../components/PlaidSetup.svelte"
  import api from '../services/apiService.js';
  import { user } from '../store.js'
  import {push} from 'svelte-spa-router'

  let accountPromise
  let unsubscribe = user.subscribe((u) => { 
      if(!u.id){
        push('/login')
      }else {
        accountPromise = api.getAccounts();
      }
    })
    onDestroy(unsubscribe);

  let filter = "all"

</script>

<section class="main-content columns is-fullheight">
  <Aside bind:filter={filter}/>
  <div class="column is-10 section scroll">
    {#await accountPromise}
      <div class="section is-medium is-flex is-justify-content-center is-align-items-center">
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


<style>
  
  .main-content {
    padding: 10px;
    height: calc(100vh - 56px);
  }
  


</style>