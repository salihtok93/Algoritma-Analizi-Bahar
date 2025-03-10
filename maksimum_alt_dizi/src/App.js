import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";

const MaximumSubarrayComparison = () => {
  const [inputArray, setInputArray] = useState("");
  const [results, setResults] = useState([]);

  // Kullanıcıdan alınan veriyi güncelleyen fonksiyon
  const handleChange = (event) => {
    setInputArray(event.target.value);
  };

  // Hesaplama butonuna basıldığında çalışan fonksiyon
  const handleCalculate = () => {
    const array = inputArray.split(",").map((num) => parseInt(num.trim(), 10));
    const kadaneResult = kadaneAlgorithm(array);
    const bruteForceResult = bruteForceAlgorithm(array);
    const divideAndConquerResult = divideAndConquerAlgorithm(array);

    setResults([
      {
        algorithm: "Kadane's Algorithm",
        maxSum: kadaneResult.maxSum,
        subarray: kadaneResult.subarray,
        iterations: kadaneResult.iterations,
      },
      {
        algorithm: "Brute Force",
        maxSum: bruteForceResult.maxSum,
        subarray: bruteForceResult.subarray,
        iterations: bruteForceResult.iterations,
      },
      {
        algorithm: "Divide & Conquer",
        maxSum: divideAndConquerResult.maxSum,
        subarray: divideAndConquerResult.subarray,
        iterations: divideAndConquerResult.iterations,
      },
    ]);
  };

  // Kadane Algoritması
  const kadaneAlgorithm = (arr) => {
    let maxEndingHere = arr[0];
    let maxSoFar = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    let iterations = 0;

    for (let i = 1; i < arr.length; i++) {
      iterations++;
      if (arr[i] > maxEndingHere + arr[i]) {
        maxEndingHere = arr[i];
        tempStart = i;
      } else {
        maxEndingHere += arr[i];
      }

      if (maxSoFar < maxEndingHere) {
        maxSoFar = maxEndingHere;
        start = tempStart;
        end = i;
      }
    }

    return {
      maxSum: maxSoFar,
      subarray: arr.slice(start, end + 1),
      iterations,
    };
  };

  // Brute Force Algoritması
  const bruteForceAlgorithm = (arr) => {
    let maxSum = -Infinity;
    let currentSum;
    let subarrayStart = 0;
    let subarrayEnd = 0;
    let iterations = 0;

    for (let i = 0; i < arr.length; i++) {
      currentSum = 0;
      for (let j = i; j < arr.length; j++) {
        iterations++;
        currentSum += arr[j];
        if (currentSum > maxSum) {
          maxSum = currentSum;
          subarrayStart = i;
          subarrayEnd = j;
        }
      }
    }

    return {
      maxSum,
      subarray: arr.slice(subarrayStart, subarrayEnd + 1),
      iterations,
    };
  };

  // Divide & Conquer algoritması
  const divideAndConquerAlgorithm = (arr) => {
    let iterations = { count: 0 }; // Nesne olarak tanımlıyoruz, böylece referans olarak geçebiliriz
    const { maxSum, left, right } = findMaxSubarray(
      arr,
      0,
      arr.length - 1,
      iterations
    );
    return {
      maxSum: maxSum !== undefined ? maxSum : -Infinity, // undefined ise -Infinity yap
      subarray: arr.slice(left, right + 1),
      iterations: iterations.count, // Toplam iterasyon sayısını döndür
    };
  };

  // Maksimum alt diziyi bulan fonksiyon (Böl ve Yönet)
  const findMaxSubarray = (arr, low, high, iterations) => {
    iterations.count++; // Her çağrıldığında iterasyonu artır

    if (low === high) {
      return {
        maxSum: arr[low],
        left: low,
        right: high,
        iterations: iterations.count,
      };
    } else {
      const mid = Math.floor((low + high) / 2);
      const leftResult = findMaxSubarray(arr, low, mid, iterations);
      const rightResult = findMaxSubarray(arr, mid + 1, high, iterations);
      const crossResult = findMaxCrossingSubarray(arr, low, mid, high);

      if (
        leftResult.maxSum >= rightResult.maxSum &&
        leftResult.maxSum >= crossResult.sum
      ) {
        return leftResult;
      } else if (
        rightResult.maxSum >= leftResult.maxSum &&
        rightResult.maxSum >= crossResult.sum
      ) {
        return rightResult;
      } else {
        return {
          maxSum: crossResult.sum,
          left: crossResult.left,
          right: crossResult.right,
        };
      }
    }
  };

  const findMaxCrossingSubarray = (arr, low, mid, high) => {
    let leftSum = -Infinity;
    let sum = 0;
    let maxLeft = mid;

    // Sol taraftaki en büyük toplamı bul
    for (let i = mid; i >= low; i--) {
      sum += arr[i];
      if (sum > leftSum) {
        leftSum = sum;
        maxLeft = i;
      }
    }

    let rightSum = -Infinity;
    sum = 0;
    let maxRight = mid + 1;

    // Sağ taraftaki en büyük toplamı bul
    for (let j = mid + 1; j <= high; j++) {
      sum += arr[j];
      if (sum > rightSum) {
        rightSum = sum;
        maxRight = j;
      }
    }

    return {
      sum: leftSum + rightSum,
      left: maxLeft,
      right: maxRight,
    };
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Maksimum Alt Dizi Karşılaştırma
        </Typography>
        <TextField
          label="Sayıları virgülle ayırarak girin"
          variant="outlined"
          value={inputArray}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={handleCalculate}>
          Hesapla
        </Button>
        {results.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Algoritma</TableCell>
                  <TableCell>Maksimum Toplam</TableCell>
                  <TableCell>Alt Dizi</TableCell>
                  <TableCell>İterasyon Sayısı</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.algorithm}</TableCell>
                    <TableCell>{result.maxSum}</TableCell>
                    <TableCell>{result.subarray.join(", ")}</TableCell>
                    <TableCell>{result.iterations}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default MaximumSubarrayComparison;
