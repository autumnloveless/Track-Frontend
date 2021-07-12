<script>
    import api from '../services/apiService.js';
    const updateTransactions = async () => {
        let result = await api.updateTransactions();
        if (result.success){
            location.reload();
        }
    }
</script>

Looks like you haven't added a bank account yet. Get stared here:
<div class="is-flex is-flex-direction-column is-align-items-center">
    <button class="button is-info m-2" on:click={api.linkBankAccount}>Add Bank Account</button>
    <button class="button is-info m-2" on:click={updateTransactions}>Refresh Transactions</button>
</div>

<style lang="scss">
    
</style>