import { Component } from '@angular/core';

@Component({
  selector: 'app-support',
  standalone: false,
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  onSubmit() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;

    if(!nameInput.value || !emailInput.value || !messageInput.value){
      const messageDiv = document.createElement('div');
      messageDiv.textContent = 'Campos equivocados/incompletos';
      messageDiv.style.color = 'red';
      messageDiv.style.textAlign = 'center';
      messageDiv.style.marginTop = '10px';

      const formContainer = document.querySelector('.contact-form');
      if (formContainer) {
        formContainer.insertAdjacentElement('afterend', messageDiv);
        setTimeout(() => {
          messageDiv.remove()
        }, 3000)
      }
      return
    }



    const form = document.querySelector('.contact-form') as HTMLFormElement;
    if (form) {
      form.reset();
    }

    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Mensaje enviado con éxito';
    messageDiv.style.color = 'green';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.marginTop = '10px';


    const formContainer = document.querySelector('.contact-form');
    if (formContainer) {
      formContainer.insertAdjacentElement('afterend', messageDiv);
      setTimeout(() => {
        messageDiv.remove()
      }, 3000)
    }
  }
}
