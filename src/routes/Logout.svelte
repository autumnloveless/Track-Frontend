<script>
  import {onMount} from 'svelte'
  import {logout} from '../services/authService.js';
  import { push } from 'svelte-spa-router';

  onMount(async () => {
    await logout();
    push('/login')
  })
  
</script>

Logging Out...
<div class="loading-container section is-medium">
  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
</div>
