import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentClosedComponent } from './agent-closed.component';

describe('AgentClosedComponent', () => {
  let component: AgentClosedComponent;
  let fixture: ComponentFixture<AgentClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
