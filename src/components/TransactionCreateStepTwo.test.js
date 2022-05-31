import { render, screen } from '@testing-library/react';
import TransactionCreateStepTwo from './TransactionCreateStepTwo';
import userEvent from '@testing-library/user-event'


test("on initial render, the pay button is disabled", async () => {
    render(<TransactionCreateStepTwo 
            receiver={{id:'1'}}
            sender={{id:'1'}}
    />);
    expect(await screen.findByRole('button', {name: /pay/i})).toBeDisabled();
})




test("after enter amount and note, pay button become enabled", async () => {
    render(<TransactionCreateStepTwo 
            receiver={{id:'1'}}
            sender={{id:'1'}}
    />);
    
    userEvent.type(screen.getByPlaceholderText(/amount/i),'50');
    userEvent.type(screen.getByPlaceholderText(/note/i),'dinner');
    expect(await screen.findByRole('button',{name:/pay/i})).toBeEnabled();
})



// Integration test
test("Step two payment integration", async () => {
    render(<TransactionCreateStepTwo 
            receiver={{id:'1'}}
            sender={{id:'1'}}
    />);
    expect(await screen.findByRole('button', {name: /pay/i})).toBeDisabled();
    userEvent.type(screen.getByPlaceholderText(/amount/i),'50');
    userEvent.type(screen.getByPlaceholderText(/note/i),'dinner');
    expect(await screen.findByRole('button',{name:/pay/i})).toBeEnabled();
})



