window.addEventListener("DOMContentLoaded", async () => {
  const uiController = new UiController();
  const namesService = NamesService.getService();
  
  try {
    await namesService.retrieveNames();
  } catch(error) {
    const message = error + ' Try reloading the page.';
    alert(message);
  }
  
  uiController.configureStartButton();
});
