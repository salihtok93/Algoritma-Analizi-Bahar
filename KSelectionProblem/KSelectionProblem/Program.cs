using System;
using System.Diagnostics;
using System.Linq;

class Program
{
    static void Main()
    {
        int[] sizes = { 1000, 5000, 10000, 50000, 100000 };
        int k = 10; // k. en küçük eleman
        Random rand = new Random();

        foreach (int size in sizes)
        {
            int[] array = Enumerable.Range(1, size).OrderBy(x => rand.Next()).ToArray();

            int[] array1 = (int[])array.Clone();
            int[] array2 = (int[])array.Clone();

            Stopwatch sw = Stopwatch.StartNew();
            int result1 = FindKthSmallest_Sort(array1, k);
            sw.Stop();
            Console.WriteLine($"Boyut: {size}, Sıralama Yöntemi: {sw.ElapsedMilliseconds} ms, Sonuç: {result1}");

            sw.Restart();
            int result2 = FindKthSmallest_PartialSort(array2, k);
            sw.Stop();
            Console.WriteLine($"Boyut: {size}, Kısmi Sıralama: {sw.ElapsedMilliseconds} ms, Sonuç: {result2}\n");
        }
    }

    static int FindKthSmallest_Sort(int[] arr, int k)
    {
        Array.Sort(arr);
        return arr[k - 1];
    }

    static int FindKthSmallest_PartialSort(int[] arr, int k)
    {
        Array.Sort(arr, 0, k);
        for (int i = k; i < arr.Length; i++)
        {
            if (arr[i] < arr[k - 1])
            {
                int j = k - 1;
                while (j > 0 && arr[j - 1] > arr[i])
                {
                    arr[j] = arr[j - 1];
                    j--;
                }
                arr[j] = arr[i];
            }
        }
        return arr[k - 1];
    }
}
