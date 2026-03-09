import { TodoStore } from "../store/TodoStore.js";
describe("TodoStore", () => {
    test("add todo", () => {
        const store = new TodoStore([]);
        const todo = store.add("task");
        const list = store.getAll();
        expect(list.length).toBe(1);
        expect(list[0].title).toBe("task");
        expect(todo.id).toBeDefined();
    });
    test("toggle todo", () => {
        const store = new TodoStore([]);
        const todo = store.add("task");
        store.toggle(todo.id);
        const updated = store.getAll()[0];
        expect(updated.completed).toBe(true);
    });
    test("remove todo", () => {
        const store = new TodoStore([]);
        const todo = store.add("task");
        store.remove(todo.id);
        expect(store.getAll().length).toBe(0);
    });
    test("clear completed", () => {
        const store = new TodoStore([]);
        const a = store.add("a");
        const b = store.add("b");
        store.toggle(a.id);
        store.clearCompleted();
        const remaining = store.getAll();
        expect(remaining.length).toBe(1);
        expect(remaining[0].id).toBe(b.id);
    });
    test("filter active", () => {
        const store = new TodoStore([]);
        const a = store.add("a");
        const b = store.add("b");
        store.toggle(a.id);
        const active = store.filtered("active");
        expect(active.length).toBe(1);
        expect(active[0].id).toBe(b.id);
    });
});
