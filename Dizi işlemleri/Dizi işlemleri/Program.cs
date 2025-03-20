using System;

class DynamicArrayCRUD
{
    private int[] array;
    private int size;
    private int resizeCount;

    public DynamicArrayCRUD()
    {
        array = new int[5]; // Başlangıçta 5 elemanlık bir dizi oluşturuyoruz
        size = 0; // Dizi içindeki eleman sayısı
        resizeCount = 0; // Resize fonksiyonunun çağrılma sayısı
    }

    public void Add(int element)
    {
        if (size == array.Length)
        {
            ResizeArray(); // Dizi dolu ise boyutunu 2 katına çıkar
        }

        array[size] = element;
        size++;
    }

    private void ResizeArray()
    {
        int newLength = array.Length * 2;
        int[] newArray = new int[newLength];

        Array.Copy(array, newArray, array.Length);
        array = newArray;

        resizeCount++;
        Console.WriteLine($"Dizi boyutu {newLength} olarak güncellendi.");
    }

    public void ReportResizeCount()
    {
        Console.WriteLine($"Resize fonksiyonu toplam {resizeCount} defa çağrıldı.");
    }

    public void PrintArray()
    {
        Console.Write("Array içeriği: ");
        for (int i = 0; i < size; i++)
        {
            Console.Write(array[i] + " ");
        }
        Console.WriteLine();
    }
}

class Program
{
    static void Main()
    {
        DynamicArrayCRUD dynamicArray = new DynamicArrayCRUD();

        // İlk olarak 6 eleman ekleyelim (Başlangıç kapasitesi 5 olduğundan 10'a çıkmalı)
        for (int i = 1; i <= 6; i++)
        {
            dynamicArray.Add(i);
        }

        // Sonra 15 eleman daha ekleyelim (Kapasite 10'dan 20'ye çıkmalı)
        for (int i = 7; i <= 70; i++)
        {
            dynamicArray.Add(i);
        }

        dynamicArray.PrintArray();
        dynamicArray.ReportResizeCount();
    }
}
