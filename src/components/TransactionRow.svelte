<script>
  import Starred from './Starred.svelte';
  import api from '../services/apiService.js';
  export let transaction;

  const toggleStar = async () => {
    let result = await api.updateTransaction(transaction.id, { starred: !transaction.starred });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }
</script>

<tr class:is_read="{transaction.read}">
  <td class="is-narrow"><input type="checkbox" name="" id=""></td>
  <td class="is-narrow" on:click={toggleStar}><Starred starred={transaction.starred} /></td>
  <td class="has-text-right ">${transaction.amount.toFixed(2)}</td>
  <td>{ transaction.merchantName || transaction.name}</td>
  <td>{new Date(transaction.date).toLocaleString()}</td>
</tr>