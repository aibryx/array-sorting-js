import { useState } from "react";
import styles from "./App.module.css";

function generateRandomArray(length: number) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(Math.floor(Math.random() * length));
  }
  return array;
}

function App() {
  const [arraySize, setArraySize] = useState(5000);
  const [array, setArray] = useState(generateRandomArray(arraySize));
  const [sortingResults, setSortingResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateArray = (size: number) => {
    setArraySize(size);
    setArray(generateRandomArray(size));
    setSortingResults([]);
  };

  // Сортировка вставками
  const insertionSort = (arr: number[]) => {
    console.log(arr);
    const n = arr.length;
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  };

  // Сортировка выбором
  const selectionSort = (arr: number[]) => {
    console.log(arr);
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
  };

  // Сортировка пузырьком
  const bubbleSort = (arr: number[]) => {
    console.log(arr);
    const n = arr.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  };

  // @ts-ignore
  // Быстрая сортировка
  const quickSort = (arr: number[]) => {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  // @ts-ignore
  // Сортировка слиянием
  const mergeSort = (arr: number[]) => {
    const half = arr.length / 2;

    if (arr.length < 2) {
      return arr;
    }

    const left = arr.splice(0, half);

    return merge(mergeSort(left), mergeSort(array));
  };

  function merge(left: any, right: any) {
    let arr = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    return [...arr, ...left, ...right];
  }

  const heapSort = (arr: number[]) => {
    const n = arr.length;

    // Построение кучи (heap)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }

    // Извлечение элементов из кучи
    for (let i = n - 1; i > 0; i--) {
      // Перемещаем текущий корень в конец массива
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      // Вызываем heapify для уменьшенной кучи
      heapify(arr, i, 0);
    }
  };

  function heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      heapify(arr, n, largest);
    }
  }

  const shellSort = (arr: number[]) => {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j = i;

        while (j >= gap && arr[j - gap] > temp) {
          arr[j] = arr[j - gap];
          j -= gap;
        }

        arr[j] = temp;
      }

      gap = Math.floor(gap / 2);
    }
  };

  const testSortingAlgorithm = (
    algorithm: (arr: number[]) => void | number[],
    algorithmName: string,
  ) => {
    const copyArray = [...array];
    setIsLoading((i) => !i);
    const startTime = performance.now();
    algorithm(copyArray);
    const endTime = performance.now();
    setIsLoading((i) => !i);
    const executionTime = endTime - startTime;
    const result = `${algorithmName}: ${executionTime.toFixed(2)} ms`;
    setSortingResults((prevResults) => [...prevResults, result]);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Лабораторная работа по сортировке</h1>

      <div className={styles.generation}>
        <button onClick={() => handleGenerateArray(5000)}>
          Сгенерировать 5000 элементов
        </button>
        <button onClick={() => handleGenerateArray(10000)}>
          Сгенерировать 10000 элементов
        </button>
        <button onClick={() => handleGenerateArray(100000)}>
          Сгенерировать 100000 элементов
        </button>
        <button onClick={() => handleGenerateArray(150000)}>
          Сгенерировать 150000 элементов
        </button>
      </div>

      <h2 className={styles.testing_title}>
        Тестирование алгоритмов сортировки
      </h2>
      <div className={styles.testing}>
        <button
          onClick={() => testSortingAlgorithm(insertionSort, "Insertion Sort")}
        >
          Тестировать сортировку вставками
        </button>
        <button
          onClick={() => testSortingAlgorithm(selectionSort, "Selection Sort")}
        >
          Тестировать сортировку выбором
        </button>
        <button onClick={() => testSortingAlgorithm(bubbleSort, "Bubble Sort")}>
          Тестировать сортировку обменом
        </button>
        <button onClick={() => testSortingAlgorithm(quickSort, "Quick Sort")}>
          Тестировать быструю сортировку
        </button>
        <button onClick={() => testSortingAlgorithm(mergeSort, "Merge Sort")}>
          Тестировать сортировку слиянием
        </button>
        <button onClick={() => testSortingAlgorithm(heapSort, "Heap Sort")}>
          Тестировать пирамидальную сортировку
        </button>
        <button onClick={() => testSortingAlgorithm(shellSort, "Shell Sort")}>
          Тестировать сортировку Шелла
        </button>
      </div>
      <div className={styles.result}>
        {isLoading && <div className={styles.spinner}></div>}
        {sortingResults.reverse().map((result, index) => (
          <div key={index} className={styles.result_item}>
            {result}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
