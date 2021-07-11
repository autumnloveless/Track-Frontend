<script>
  import Starred from './Starred.svelte';
  import {push} from 'svelte-spa-router'
  import api from '../services/apiService.js';
  export let transaction, group, checked;

  $: updateChekbox(group)
	$: updateGroup(checked)
	
	function updateChekbox(group) {
		checked = group.indexOf(transaction.id) >= 0
	}
	
	function updateGroup(checked) {
		const index = group.indexOf(transaction.id)
		if (checked) {
			if (index < 0) {
				group.push(transaction.id)
				group = group
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1)
				group = group
			}
		}
	}

  const toggleStar = async (e) => {
    e.stopPropagation();
    let result = await api.updateTransaction(transaction.id, { starred: !transaction.starred });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }

  const markRead = async (read) => {
    if(transaction.read == read) { return }
    let result = await api.updateTransaction(transaction.id, { read: read });
    if (result && !result.error) { transaction = result }
    else { console.log(result.error) }
  }

  const checkItem = async (e) => {
    e.stopPropagation();
  }

  const openItem = async () => {
    markRead(true);
    push('/transactions/' + transaction.id)
  }

</script>

<tr class:is_read="{transaction.read}" on:click={openItem}>
  <td class="is-narrow"><input type="checkbox" bind:checked={checked} on:click={checkItem} value={transaction.id}></td>
  <td class="is-narrow" on:click={toggleStar}><Starred starred={transaction.starred} /></td>
  <td class="has-text-right ">${transaction.amount.toFixed(2)}</td>
  <td>{ transaction.merchantName || transaction.name}</td>
  <td class="has-text-right">{new Date(transaction.date).toLocaleString()}</td>
</tr>