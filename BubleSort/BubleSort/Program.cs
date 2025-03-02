using System;
using System.Diagnostics;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] sizes = { 1000, 5000, 10000, 20000 };
        Random rand = new Random();

        foreach (int size in sizes)
        {
            int[] array = Enumerable.Range(1, size).OrderBy(x => rand.Next()).ToArray();
            int[] arrayCopy = (int[])array.Clone();

            Stopwatch sw = Stopwatch.StartNew();
            BubbleSort(arrayCopy);
            sw.Stop();

            Console.WriteLine($"Boyut: {size}, Bubble Sort Süresi: {sw.ElapsedMilliseconds} ms");
        }
    }

    static void BubbleSort(int[] arr)
    {
        int n = arr.Length;
        bool swapped;
        for (int i = 0; i < n - 1; i++)
        {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++)
            {
                if (arr[j] > arr[j + 1])
                {
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}
