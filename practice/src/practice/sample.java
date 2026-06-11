package practice;

import java.util.Arrays;
import java.util.TreeSet;

public class sample {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] a1 = { 1, 2, 4, 3 };
		int[] a2 = { 2, 3, 6, 5 };
		
		int a[] = new int[a1.length + a2.length];
		int j = 0;
		for(int i = 0; i < a1.length; i++) {
			a[j++] = a1[i];
		}
		for(int i = 0; i < a2.length; i++) {
			a[j++] = a2[i];
		}
		System.out.println(Arrays.toString(a));
		
		TreeSet t1 = new TreeSet();
		for(int no : a) {
			t1.add(no);
		}
		
		System.out.println(t1);
	}

}
