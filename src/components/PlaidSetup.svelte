<script>
    import api from '../services/apiService.js';
</script>

Looks like you haven't added a bank account yet. Get stared here:
<div class="is-flex is-flex-direction-column is-align-items-center">
    <button class="p-2 m-2" on:click={api.linkBankAccount}>Add Bank Account</button>
    <button class="p-2 m-2" on:click={api.updateTransactions}>Load Transactions</button>
</div>

<style lang="scss">
    
</style>