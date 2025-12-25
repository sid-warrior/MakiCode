export interface CodeSnippet {
  id: string;
  language: string;
  code: string;
}

export const codeSnippets: CodeSnippet[] = [
  // TypeScript - longer snippets
  {
    id: 'ts-1',
    language: 'typescript',
    code: `function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

const result = factorial(5);
console.log(result);`,
  },
  {
    id: 'ts-2',
    language: 'typescript',
    code: `interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

function createUser(name: string, email: string): User {
    return {
        id: Math.random(),
        name,
        email,
        isActive: true,
    };
}`,
  },
  {
    id: 'ts-3',
    language: 'typescript',
    code: `async function fetchUsers(): Promise<User[]> {
    const response = await fetch('/api/users');
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const data = await response.json();
    return data;
}`,
  },
  {
    id: 'ts-4',
    language: 'typescript',
    code: `class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
}`,
  },
  // JavaScript
  {
    id: 'js-1',
    language: 'javascript',
    code: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
  },
  {
    id: 'js-2',
    language: 'javascript',
    code: `function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}`,
  },
  {
    id: 'js-3',
    language: 'javascript',
    code: `const fibonacci = (n) => {
    if (n <= 1) return n;
    
    let prev = 0;
    let curr = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
};`,
  },
  // Python
  {
    id: 'py-1',
    language: 'python',
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quicksort(left) + middle + quicksort(right)`,
  },
  {
    id: 'py-2',
    language: 'python',
    code: `class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
    
    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BinaryTree(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BinaryTree(value)
            else:
                self.right.insert(value)`,
  },
  {
    id: 'py-3',
    language: 'python',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },
  // Rust
  {
    id: 'rust-1',
    language: 'rust',
    code: `fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> {
    let mut low = 0;
    let mut high = arr.len();
    
    while low < high {
        let mid = low + (high - low) / 2;
        
        match arr[mid].cmp(target) {
            Ordering::Less => low = mid + 1,
            Ordering::Greater => high = mid,
            Ordering::Equal => return Some(mid),
        }
    }
    
    None
}`,
  },
  {
    id: 'rust-2',
    language: 'rust',
    code: `struct LinkedList<T> {
    head: Option<Box<Node<T>>>,
    len: usize,
}

impl<T> LinkedList<T> {
    fn new() -> Self {
        LinkedList { head: None, len: 0 }
    }
    
    fn push(&mut self, value: T) {
        let new_node = Box::new(Node {
            value,
            next: self.head.take(),
        });
        self.head = Some(new_node);
        self.len += 1;
    }
}`,
  },
  // Go
  {
    id: 'go-1',
    language: 'go',
    code: `func binarySearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    
    for low <= high {
        mid := low + (high-low)/2
        
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    
    return -1
}`,
  },
  {
    id: 'go-2',
    language: 'go',
    code: `type Stack struct {
    items []interface{}
}

func (s *Stack) Push(item interface{}) {
    s.items = append(s.items, item)
}

func (s *Stack) Pop() interface{} {
    if len(s.items) == 0 {
        return nil
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item
}`,
  },
  // Java
  {
    id: 'java-1',
    language: 'java',
    code: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        
        return -1;
    }
}`,
  },
  {
    id: 'java-2',
    language: 'java',
    code: `public class LinkedList<T> {
    private Node<T> head;
    private int size;
    
    public void add(T value) {
        Node<T> newNode = new Node<>(value);
        if (head == null) {
            head = newNode;
        } else {
            Node<T> current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }
}`,
  },
  // C++
  {
    id: 'cpp-1',
    language: 'cpp',
    code: `int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int result = factorial(5);
    cout << result << endl;
    return 0;
}`,
  },
  {
    id: 'cpp-2',
    language: 'cpp',
    code: `int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    
    int prev = 0;
    int curr = 1;
    
    for (int i = 2; i <= n; i++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }
    
    return curr;
}`,
  },
  {
    id: 'cpp-3',
    language: 'cpp',
    code: `bool isPrime(int n) {
    if (n <= 1) {
        return false;
    }
    
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false;
        }
    }
    
    return true;
}`,
  },
  {
    id: 'cpp-4',
    language: 'cpp',
    code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  },
  {
    id: 'cpp-5',
    language: 'cpp',
    code: `void reverseArray(int arr[], int n) {
    int start = 0;
    int end = n - 1;
    
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}`,
  },
  {
    id: 'cpp-6',
    language: 'cpp',
    code: `int findMax(int arr[], int n) {
    int maxVal = arr[0];
    
    for (int i = 1; i < n; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    
    return maxVal;
}`,
  },
];

export const getRandomSnippet = (language?: string): CodeSnippet => {
  const filtered = language && language !== 'all'
    ? codeSnippets.filter((s) => s.language === language)
    : codeSnippets;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

export const languages = [
  'typescript',
  'javascript', 
  'python',
  'rust',
  'go',
  'java',
  'cpp',
] as const;

export type Language = (typeof languages)[number];
