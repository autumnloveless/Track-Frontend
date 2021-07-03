<script>
  import Aside from "../components/Sidebar.svelte"
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
</script>

<section class="main-content columns is-fullheight">
  <Aside bind:filter={filter}/>
  <div class="column is-10 section">
    <div class="card">
      <div class="card-header capitalize"><p class="card-header-title">{filter}</p></div>
      <div class="card-content" style="padding: 0; padding-top: 5px;">
        <div class="table-container is-scrollable">
          <table class="table is-hoverable is-fullwidth">
            <tbody>
              {#each transactions as transaction, i}
                <tr class:is_read="{transaction.read}">
                  <td> <input type="checkbox" name="" id=""> </td>
                  <td class="has-text-right is-narrow">${transaction.amount.toFixed(2)}</td>
                  <td>{transaction.store}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.starred}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div> 
</section>

<style lang="scss">
  .is_read {
    background-color: #f2f2f2;
    td {
      border: 1px solid #cbcbcb;
      border-width: 0 0 1px;
    }
  }
  .is-scrollable {
    overflow-y: scroll;
  }
  .table-container {
    max-height: 75vh;
  }
  
</style>
