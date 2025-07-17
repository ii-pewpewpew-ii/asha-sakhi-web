import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PatientService } from '../../shared/patient.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Patient {
  fullName: string;
  mobileNumber: string;
}

@Component({
  selector: 'app-diet-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './diet-chat.component.html',
  styleUrls: ['./diet-chat.component.scss']
})
export class DietChatComponent implements OnInit {
  messageText: string = '';
  messages: Message[] = [];
  patients: Patient[] = [];
  selectedPatientPhone: string | null = null;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    // Replace with actual API or static data
    this.patientService.fetchPatientNumbers().subscribe({
      next: (res: any) => {
        this.patients = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })

    
  }

  sendMessage() {
    if (!this.messageText.trim() || !this.selectedPatientPhone) return;

    this.messages.push({
      text: this.messageText,
      sender: 'user',
      timestamp: new Date()
    });

    this.patientService.queryPatientLlm(this.selectedPatientPhone, this.messageText).subscribe({
      next: (res) => {
        this.messages.push({
          text: JSON.stringify(res.data.diet_plan, null, 2) || 'Sorry, no response.',
          sender: 'bot',
          timestamp: new Date()
        });
      },
      error: (err) => {
        console.error(err);
        this.messages.push({
          text: 'Error reaching the server.',
          sender: 'bot',
          timestamp: new Date()
        });
      }
    });

    this.messageText = '';
  }

  onPatientChange() {
  this.messages = [];       // Clear existing messages
  this.messageText = '';    // Clear input field

  // Optional: Add a new welcome message for context
  this.messages.push({
    text: 'Hello! How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  });

  // You can also trigger the API call with the selected patient's phone number here
}
}
