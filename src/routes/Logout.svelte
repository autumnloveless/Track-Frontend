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
