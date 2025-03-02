export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDate: (date: string | number | Date) => {
        return new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
      }
    }
  };
});