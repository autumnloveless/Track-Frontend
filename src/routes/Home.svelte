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
  <div class="column is-10 section">
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
  .lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  --timing: 0.9s
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #000;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 var(--timing) infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 var(--timing) infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 var(--timing) infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 var(--timing) infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

</style>