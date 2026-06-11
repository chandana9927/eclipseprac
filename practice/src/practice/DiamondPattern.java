package practice;

public class DiamondPattern {
	public static void main(String[] args) {
		int no = 5;
		for(int i = 1; i <= no; i++) {
			for(int j = i; j < no; j++) {
				System.out.print(" ");
			}
			System.out.print("*");
			for(int j = 1; j < (i - 1) * 2; j++) {
				System.out.print(" ");
			}
			if(i == 1) {
				System.out.println();
			}else {
				System.out.println("*");
			}
		}
		for(int i = no; i >= 1; i--) {
			for(int j = i; j < no; j++) {
				System.out.print(" ");
			}
			System.out.print("*");
			for(int j = 1; j < (i - 1) * 2; j++) {
				System.out.print(" ");
			}
			if(i == 1) {
				System.out.println();
			}else {
				System.out.println("*");
			}
		}
	}

}
