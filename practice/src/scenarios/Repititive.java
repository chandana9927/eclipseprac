package scenarios;

import java.util.Arrays;

public class Repititive {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		// ip: a10b11c13 separate string and numeric values using replace and replace
		// all method.

		String str = "a10b11c13";
		String s1 = str.replaceAll("[0-9]", "");
		String s2 = str.replaceAll("[a-z]", " ");
		String[] s = s2.split(" ");


		for (int i = 1; i < s.length; i++) {
			display(s1.charAt(i - 1), s[i]);
		}
	}

	static void display(char c1, String s2) {
		int no = Integer.parseInt(s2);
		for (int i = 1; i <= no; i++) {
			System.out.print(c1);
		}

	}

}
