import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer/customer.service';
import { Customer } from './models/customer';
import { NgForm } from '@angular/forms';
import { EmptyExpr } from '@angular/compiler';
import { BookService } from './services/book/book.service';
import { SalesBookService } from './services/salesBook/salesBook.service';
import { Book } from './models/book';
import { SalesBook } from './models/salesBook';
import { salesBookDto } from './dto/salesBookDto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',]
})
export class AppComponent implements OnInit {

  book = {} as Book;
  books!: Book[];
  customer = {} as Customer;
  customers!: Customer[];
  salesBook = {} as SalesBook;
  salesBooks!: SalesBook[];
  clienteId = 0;
  livroId = 0;

  salesBooksView = {} as salesBookDto;


  constructor(private bookService: BookService,
    private costumerService: CustomerService,
    private salesBookService: SalesBookService) { }

  ngOnInit() {
    this.getBooks();
    this.getCustomers();
    this.getSalesBooks();
  }
  //#region Books
  saveBook(form: NgForm) {
    if (this.book.id !== undefined) {
      this.bookService.updateBook(this.book).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.bookService.saveBook(this.book).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os livros
  getBooks() {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  // deleta um livro
  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe(() => {
      this.getBooks();
    });
  }

  // copia o livro para ser editado.
  editBook(book: Book) {
    this.book = { ...book };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getBooks();
    form.resetForm();
    this.book = {} as Book;
  }
  //#endregion   

  //#region Customer 
  cleanFormCustomer(form2: NgForm) {
    this.getCustomers();
    form2.resetForm();
    this.customer = {} as Customer;
  }

  saveCustomer(form2: NgForm) {
    if (this.customer.id !== undefined) {
      this.costumerService.updateCustomer(this.customer).subscribe(() => {
        this.cleanFormCustomer(form2);
      });
    } else {
      this.costumerService.saveCustomer(this.customer).subscribe(() => {
        this.cleanFormCustomer(form2);
      });
    }
  }

  // Chama o serviço para obtém todos os clientes
  getCustomers() {
    this.costumerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  // deleta um cliente
  deleteCustomer(customer: Customer) {
    this.costumerService.deleteCustomer(customer).subscribe(() => {
      this.getCustomers();
    });
  }

  // copia o cliente para ser editado.
  editCustomer(customer: Customer) {
    this.customer = { ...customer };
  }
  //#endregion

  //#region SalesBook
  cleanFormSalesBook(form3: NgForm) {
    this.getSalesBooks();
    form3.resetForm();
    this.salesBook = {} as SalesBook;
  }

  saveSalesBook(form3: NgForm) {

    if (this.salesBook.costumerId == undefined) return alert('Por favor selecione um cliente!')

    if (this.salesBook.bookId == undefined) return alert('Por favor selecione um livro!')

    if (this.salesBook.salesBookId !== undefined) {
      this.salesBookService.updateSalesBook(this.salesBook).subscribe(() => {
        this.cleanFormSalesBook(form3);
      });
    } else {
      this.salesBookService.saveSalesBook(this.salesBook).subscribe(() => {
        this.cleanFormSalesBook(form3);
      });
    }
  }

  // Chama o serviço para obtém todas as vendas
  getSalesBooks() {
    this.salesBookService.getSalesBook().subscribe((salesBooks: SalesBook[]) => {
      this.salesBooks = salesBooks;

    });
  }

  // deleta uma venda
  deleteSalesBook(salesBook: SalesBook) {
    this.salesBookService.deleteSalesBook(salesBook).subscribe(() => {
      this.getSalesBooks();
    });
  }

  // copia a venda para ser editada.
  editSalesBook(salesBook: SalesBook) {
    this.salesBook = { ...salesBook };
  }

  changeCustomerValue() {
    this.salesBook.costumerId = this.clienteId;

    var customerSelected = this.customers.find(x => x.id == this.clienteId);

    this.salesBook.customerZipCode = customerSelected?.zipCode ?? 0
  }

  changeBookValue() {
    this.salesBook.bookId = this.livroId;

    var bookSelected = this.books.find(x => x.id == this.livroId);

    this.salesBook.priceBook = bookSelected?.price ?? 0
  }
  //#endregion
}