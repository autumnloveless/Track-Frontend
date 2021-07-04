<script>
  import Aside from "../components/Sidebar.svelte"
  import Transactions from "../components/Transactions.svelte"
  import PlaidSetup from "../components/PlaidSetup.svelte"
  import { onMount } from "svelte";
  import api from '../services/apiService.js';

  onMount(async () => {
    await api.getTransactions();
  })

  let filter = "all"
  let transactions = [
    { "amount": 100.00, "store": 'Hot Topic', "date": '10/19/20', "starred": false, "read": false},
    { "amount": 101.53, "store": 'Beach', "date": '10/18/20', "starred": false, "read": false},
    { "amount": 64.01, "store": 'Target', "date": '10/18/20', "starred": false, "read": true},
    { "amount": 130.01, "store": 'Walgreens', "date": '10/16/20', "starred": true, "read": true},
    { "amount": 4.05, "store": 'Old Navy', "date": '10/14/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
    { "amount": 8.65, "store": 'Hot Topic', "date": '10/10/20', "starred": false, "read": true},
  ]
  // transactions = [];
</script>

<section class="main-content columns is-fullheight">
  <Aside bind:filter={filter}/>
  <div class="column is-9 section">
    {#if transactions.length > 0}
      <Transactions transactions={transactions} filter={filter}/>
    {:else}
      <PlaidSetup/>
    {/if}
    
  </div> 
</section>


