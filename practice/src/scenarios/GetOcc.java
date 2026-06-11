package scenarios;

public class GetOcc {

	public static void main(String[] args) {
		//input: a3b3c2d2
		//output: aaabbbccdd
		String str = "a3b3c2d2";
//		String ans = display(str);
		for(int i = 0; i < str.length(); i+=2) {
			display(str.charAt(i), str.charAt(i+1));
		}
	}
	static void display(char c1, char c2) {
		int no = (int) (c2-48);
		for(int i=1; i <= no; i++) {
			System.out.print(c1);
		}
	}

}
