import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLiveComponent } from './agent-live.component';

describe('AgentLiveComponent', () => {
  let component: AgentLiveComponent;
  let fixture: ComponentFixture<AgentLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
