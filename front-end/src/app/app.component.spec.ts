import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let fixture: AppComponent;

  beforeEach(() => {
    fixture = new AppComponent();
  });

  describe("Setup component", () => {
    it(`should have the 'Job Hunting Portal' title`, () => {
      expect(fixture.title).toEqual("Job Hunting Portal");
    });
  });
});
