$(function () {

  var ToDo = function () {

    this.model = [
      {text: 'Buy: milk, bread, carrot, cheese, crisps, fish, lemon, meat, melon'},
      {text: 'Finish todolist'},
      {text: 'Find work'}
    ];

    this.form = $('.task-form');
    this.inputField = $('.task-form__text');
    this.todoList = $('.table__body');
    this.init();
  
  };

  // Get the size of our model at the moment
  ToDo.prototype.getLength = function () {
    return this.model.length;
  };

  // Generate html for a new line
  ToDo.prototype.getItemHtml = function (position, item) {
    var templ = '<tr><th>:position</th><td>:text</td><td></td><td><button type="button" data-index=":index" class="btn btn-danger">&#967;</button></td></tr>';
    return templ.replace(/:position/gi, position).replace(/:text/gi, item).replace(/:index/gi, position - 1);
  };

  // Add a new item to the list
  ToDo.prototype.addItem = function (todoText) {
    var newTodo = {text: todoText};
    this.model.push(newTodo);
    this.appendRenderItem(this.getLength(), newTodo);
  };

  // Add a new item to the bottom of the list in the DOM
  ToDo.prototype.appendRenderItem = function (index, item) {
    this.todoList.append(this.getItemHtml(index, item.text));
    console.log(index, item);
  };

  // Render the entire list
  ToDo.prototype.renderList = function () {
    var list = '',
    __self = this;

    $.each(this.model, function (index, item) {
      list += __self.getItemHtml(index + 1, item.text);
    });

    this.todoList.html(list);
  };

  // On Sambit
  ToDo.prototype.onFormSubmit = function (e) {
    e.preventDefault();
    this.addItem(this.inputField.val());
    console.log(this.getItemHtml(1, 'Hello'));
    this.form.trigger('reset');
  };

  // Delete an item
  ToDo.prototype.removeItem = function (index) {
    this.model.splice(index, 1);
    this.renderList();
  };

  // Initialization
  ToDo.prototype.init = function () {
    var __self = this;
    this.renderList();

    this.todoList.on('click', '.btn-danger', function (e) {
      var index = $(e.target).data('index');
      __self.removeItem(index);
    });

    this.form.submit(function (e) {
      __self.onFormSubmit(e);
    });

  };

  window.todo = new ToDo();

});