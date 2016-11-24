import { PmTablePage } from './app.po';

describe('pm-table App', function() {
  let page: PmTablePage;

  beforeEach(() => {
    page = new PmTablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
