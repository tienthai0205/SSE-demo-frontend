import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { SseService } from "src/app/services/sse.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private sseService: SseService) {}
  public facts : any[] = [];
  displayedColumns: string[] = ['fact', 'source'];
  @ViewChild(MatTable)table!: MatTable<any>;

  ngOnInit(): void {
    this.sseService
      .getServerSentEvent("http://localhost:3000/events")
      .subscribe(data => {
        let receivedFacts =JSON.parse(data.data);
        if(Array.isArray(receivedFacts)){
          this.facts = receivedFacts;
        } else {
          this.facts.push(receivedFacts);
        }
        this.table.renderRows();
      });
  }

}
