import { PaginaPage } from './app.po';

describe('pagina App', () => {
  let page: PaginaPage;

  beforeEach(() => {
    page = new PaginaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
