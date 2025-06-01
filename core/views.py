from django.shortcuts import render
from .models import *
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Household, User
import uuid
from django.utils import timezone

@csrf_exempt
def add_household(request):
    if request.method == 'POST':
        fullname = request.POST.get('fullname')
        household_number = request.POST.get('household_number')
        household_size = request.POST.get('household_size')
        address = request.POST.get('address')

        # Tìm user có tên giống fullname nhập vào
        try:
            head_user = User.objects.get(fullname=fullname)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Không tìm thấy người dùng với tên này'}, status=400)

        # Tạo hộ khẩu mới
        Household.objects.create(
            id=uuid.uuid4(),
            household_number=household_number,
            household_size=household_size,
            address=address,
            head=head_user,
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

        return JsonResponse({'message': 'Thêm thành công'})
    return JsonResponse({'error': 'Yêu cầu không hợp lệ'}, status=400)