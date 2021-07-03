<script>
    export let params = {}
</script>


<section class="main-content columns is-fullheight">
    <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
    <p class="menu-label is-hidden-touch">Return to Inbox</p>
        <ul class="menu-list">
            <li><a href="/#/app" type="button" class="button">Back</a></li>
        </ul>
    </aside>

    <div class="column is-9 section">
      <div class="card">
        <div class="card-header capitalize"><p class="card-header-title">Transaction {params.id}</p></div>
        <div class="card-content">
          Transaction info here
        </div>
      </div>
    </div> 
  </section>