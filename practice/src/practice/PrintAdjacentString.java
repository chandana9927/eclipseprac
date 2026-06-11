package practice;

public class PrintAdjacentString {

	public static void main(String[] args) {
		String str = "Hi Hi hello hi java how java are you you";
		String[] s1 = str.split(" ");
		
		for(int i = 0; i < s1.length - 1; i++ ) {
			if(palindrome(s1[i], s1[i+1])) {
				System.out.print(s1[i]+" ");
			}
		}
		System.out.println(s1[s1.length-1]);

	}
	static boolean palindrome(String s1, String s2) {
		if(s1.length() != s2.length()) {
			return true;
		}
		
		for(int i = 0; i < s1.length(); i++) {
			if(s1.charAt(i) == s2.charAt(i)) {
				return false;
			}
		}
		return true;
	}

}
