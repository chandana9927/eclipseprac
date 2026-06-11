package practice;

public class Patterns2 {
	//2nd Pattern
	public static void main(String[] args) {
		int no = 5;
		for (int row = 1; row <= no; row++) {
			for (int col = no; col >= 1; col--) {
				if (row >= col) {
					System.out.print("*");
				} else {
					System.out.print(" ");
				}
			}
			System.out.println();
		}
	}
}
